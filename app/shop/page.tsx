import Silder from '@/app/components/Shop/Silder'
import Menu from '@/app/components/Shop/Menu'
import Drink from '@/app/components/Shop/Drink'
import Footer from '../components/Home/Footer'
import Drink1 from '@/app/components/Shop/Drink1'
import Menuform from '@/app/components/Shop/Menuform'
import Payment from '@/app/components/Shop/Payment'



export default function Page() {
  return (
    <div className="flex flex-col gap-2 pb-4 bg-white">
      <Silder/>
      <Menuform/>
      <Menu/>
      <Drink/>
      <Drink1/>
      
      <Footer/>
    </div>
  )
}
