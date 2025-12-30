import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { supabase } from '@/lib/supabase'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!)

export async function POST(req: Request) {
  try {
    const { query } = await req.json()

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 })
    }

    // 1. Use Gemini to "understand" the query and generate search terms
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const prompt = `
      You are an AI search assistant for an e-commerce store. 
      The user search query is: "${query}"
      
      Please extract the main product categories, features, or keywords from this query.
      Return ONLY a comma-separated list of keywords that can be used for a database search.
      Example: "wireless headphones for running" -> "headphones, wireless, running, sports"
    `

    const result = await model.generateContent(prompt)
    const keywords = result.response.text().split(',').map(k => k.trim())

    // 2. Query Supabase using the keywords
    // We'll use a simple OR filter for now, but we could do more complex matching
    let supabaseQuery = supabase.from('products').select('*')

    const filterStrings = keywords.map(k => `title.ilike.%${k}%,description.ilike.%${k}%`)
    const { data: products, error } = await supabaseQuery.or(filterStrings.join(','))

    if (error) throw error

    // 3. Return results with an AI message
    return NextResponse.json({
      query,
      results: products || [],
      recommendations: [], // We could add more AI logic here for recommendations
      message: products && products.length > 0
        ? `AI found ${products.length} products that match your request for "${query}".`
        : `AI couldn't find exact matches for "${query}", but here are some suggestions.`
    })
  } catch (error: any) {
    console.error('AI Search error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
