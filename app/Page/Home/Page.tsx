import Header from '@/app/components/Home/Heasder';
import Lable from '@/app/components/Home/Lable';
import Main from '@/app/components/Home/Main';
import Slideform from '@/app/components/Home/Slideform';
import GameSection from '@/app/components/Home/GameSection';
import Footer from '@/app/components/Home/Footer';

export default function Page() {
  return (
    <div>
      <Header />
      <Lable />
      <Main />
      <Slideform />
      <GameSection />
      <Footer />
    </div>
  );
}
