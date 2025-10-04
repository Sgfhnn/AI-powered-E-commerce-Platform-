import { 
  UserIcon, 
  ScaleIcon, 
  ArrowsRightLeftIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

export default function SizeGuidePage() {
  const clothingSizes = {
    women: [
      { size: 'XS', bust: '32-34', waist: '24-26', hips: '34-36' },
      { size: 'S', bust: '34-36', waist: '26-28', hips: '36-38' },
      { size: 'M', bust: '36-38', waist: '28-30', hips: '38-40' },
      { size: 'L', bust: '38-40', waist: '30-32', hips: '40-42' },
      { size: 'XL', bust: '40-42', waist: '32-34', hips: '42-44' },
      { size: 'XXL', bust: '42-44', waist: '34-36', hips: '44-46' }
    ],
    men: [
      { size: 'XS', chest: '32-34', waist: '28-30', neck: '14-14.5' },
      { size: 'S', chest: '34-36', waist: '30-32', neck: '14.5-15' },
      { size: 'M', chest: '36-38', waist: '32-34', neck: '15-15.5' },
      { size: 'L', chest: '38-40', waist: '34-36', neck: '15.5-16' },
      { size: 'XL', chest: '40-42', waist: '36-38', neck: '16-16.5' },
      { size: 'XXL', chest: '42-44', waist: '38-40', neck: '16.5-17' }
    ]
  }

  const shoeSizes = {
    women: [
      { us: '5', uk: '2.5', eu: '35', cm: '22' },
      { us: '5.5', uk: '3', eu: '35.5', cm: '22.5' },
      { us: '6', uk: '3.5', eu: '36', cm: '23' },
      { us: '6.5', uk: '4', eu: '37', cm: '23.5' },
      { us: '7', uk: '4.5', eu: '37.5', cm: '24' },
      { us: '7.5', uk: '5', eu: '38', cm: '24.5' },
      { us: '8', uk: '5.5', eu: '38.5', cm: '25' },
      { us: '8.5', uk: '6', eu: '39', cm: '25.5' },
      { us: '9', uk: '6.5', eu: '40', cm: '26' },
      { us: '9.5', uk: '7', eu: '40.5', cm: '26.5' },
      { us: '10', uk: '7.5', eu: '41', cm: '27' }
    ],
    men: [
      { us: '6', uk: '5.5', eu: '39', cm: '24' },
      { us: '6.5', uk: '6', eu: '39.5', cm: '24.5' },
      { us: '7', uk: '6.5', eu: '40', cm: '25' },
      { us: '7.5', uk: '7', eu: '40.5', cm: '25.5' },
      { us: '8', uk: '7.5', eu: '41', cm: '26' },
      { us: '8.5', uk: '8', eu: '42', cm: '26.5' },
      { us: '9', uk: '8.5', eu: '42.5', cm: '27' },
      { us: '9.5', uk: '9', eu: '43', cm: '27.5' },
      { us: '10', uk: '9.5', eu: '44', cm: '28' },
      { us: '10.5', uk: '10', eu: '44.5', cm: '28.5' },
      { us: '11', uk: '10.5', eu: '45', cm: '29' },
      { us: '12', uk: '11.5', eu: '46', cm: '30' }
    ]
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <ScaleIcon className="h-16 w-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Size Guide</h1>
          <p className="text-xl text-gray-600">
            Find your perfect fit with our comprehensive sizing charts
          </p>
        </div>

        {/* How to Measure */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">How to Measure</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <UserIcon className="h-5 w-5 text-primary-600 mr-2" />
                For Clothing
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="font-medium text-gray-900 mr-2">Bust/Chest:</span>
                  Measure around the fullest part of your chest, keeping the tape horizontal.
                </li>
                <li className="flex items-start">
                  <span className="font-medium text-gray-900 mr-2">Waist:</span>
                  Measure around your natural waistline, keeping the tape comfortably loose.
                </li>
                <li className="flex items-start">
                  <span className="font-medium text-gray-900 mr-2">Hips:</span>
                  Measure around the fullest part of your hips, about 7-9 inches below your waist.
                </li>
                <li className="flex items-start">
                  <span className="font-medium text-gray-900 mr-2">Inseam:</span>
                  Measure from the crotch to the bottom of your leg along the inside seam.
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <ArrowsRightLeftIcon className="h-5 w-5 text-primary-600 mr-2" />
                For Shoes
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="font-medium text-gray-900 mr-2">Length:</span>
                  Place your foot on a piece of paper and mark the longest toe and heel. Measure the distance.
                </li>
                <li className="flex items-start">
                  <span className="font-medium text-gray-900 mr-2">Width:</span>
                  Measure the widest part of your foot, usually across the ball of your foot.
                </li>
                <li className="flex items-start">
                  <span className="font-medium text-gray-900 mr-2">Best Time:</span>
                  Measure your feet in the afternoon when they're at their largest.
                </li>
                <li className="flex items-start">
                  <span className="font-medium text-gray-900 mr-2">Both Feet:</span>
                  Measure both feet and use the larger measurement for sizing.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Women's Clothing Sizes */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Women's Clothing Sizes</h2>
          <p className="text-gray-600 mb-6">All measurements are in inches</p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bust</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waist</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hips</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clothingSizes.women.map((size, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{size.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{size.bust}"</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{size.waist}"</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{size.hips}"</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Men's Clothing Sizes */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Men's Clothing Sizes</h2>
          <p className="text-gray-600 mb-6">All measurements are in inches</p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chest</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waist</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Neck</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clothingSizes.men.map((size, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{size.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{size.chest}"</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{size.waist}"</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{size.neck}"</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Shoe Sizes */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Women's Shoes */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Women's Shoe Sizes</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">US</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">UK</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">EU</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">CM</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {shoeSizes.women.map((size, index) => (
                    <tr key={index}>
                      <td className="px-3 py-2 text-sm text-gray-900">{size.us}</td>
                      <td className="px-3 py-2 text-sm text-gray-500">{size.uk}</td>
                      <td className="px-3 py-2 text-sm text-gray-500">{size.eu}</td>
                      <td className="px-3 py-2 text-sm text-gray-500">{size.cm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Men's Shoes */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Men's Shoe Sizes</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">US</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">UK</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">EU</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">CM</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {shoeSizes.men.map((size, index) => (
                    <tr key={index}>
                      <td className="px-3 py-2 text-sm text-gray-900">{size.us}</td>
                      <td className="px-3 py-2 text-sm text-gray-500">{size.uk}</td>
                      <td className="px-3 py-2 text-sm text-gray-500">{size.eu}</td>
                      <td className="px-3 py-2 text-sm text-gray-500">{size.cm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sizing Tips */}
        <div className="bg-primary-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <InformationCircleIcon className="h-6 w-6 text-primary-600 mr-2" />
            Sizing Tips & Notes
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">General Guidelines</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• When between sizes, we recommend sizing up for comfort</li>
                <li>• Different brands may fit differently - check individual product notes</li>
                <li>• Consider the fabric - stretchy materials may fit differently than rigid ones</li>
                <li>• Read customer reviews for real-world fit feedback</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Need Help?</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Contact our customer service for personalized sizing advice</li>
                <li>• Check our return policy for easy exchanges</li>
                <li>• Use our virtual fitting room for select items</li>
                <li>• Join our size community for peer recommendations</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <a href="/contact" className="btn-primary">
              Get Sizing Help
            </a>
            <a href="/returns" className="btn-outline">
              Return Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
