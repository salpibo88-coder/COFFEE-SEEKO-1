import Silder from '@/app/components/Shop/Silder';
import Menuform from '@/app/components/Shop/Menuform';
import Menu from '@/app/components/Shop/Menu';
import Drink from '@/app/components/Shop/Drink';
import Drink1 from '@/app/components/Shop/Drink1';
import Footer from '@/app/components/Home/Footer';
import Productsell from '@/app/components/Shop/Productsell'
export default function Page() {
  return (
    <div className="flex flex-col gap-2 pb-4 bg-white">
      <Silder />
      <Menuform />
      <Menu />
      <Drink />
      <Productsell/>
      <Drink1 />
      <Footer />
    </div>
  );
}
