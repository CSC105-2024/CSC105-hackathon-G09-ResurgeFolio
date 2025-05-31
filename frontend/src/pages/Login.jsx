import { HeaderAnnoy } from '../components/HeaderAnnoy';
import { LoginForm } from '../components/LoginForm'; // Assuming you've also converted/are using a JSX version of LoginForm
import { HeroImage } from '../components/HeroImage'; // Assuming this is also a JSX or JS component

 const LoginPage = () => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <HeaderAnnoy />
      <main className="flex flex-1 max-md:flex-col">
        <LoginForm />
        <HeroImage id ="how-it-works"/>
      </main>
    </div>
  );
};
export default LoginPage;