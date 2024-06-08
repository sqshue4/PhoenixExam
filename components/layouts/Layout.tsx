import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn, setRole } from '@/store/userSlice';
import { RootState } from '@/store/store';

const Layout = ({ children }: any) => {
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const role = useSelector((state: RootState) => state.auth.role);
  console.log('🚀 ~ role:', role);

  const dispatch = useDispatch();

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    Cookies.remove('token');
    dispatch(setLoggedIn(false));
    dispatch(setRole([]));

    router.push('/');
  };

  const menu = () => {
    if (isLoggedIn && role.includes('Admin')) {
      return (
        <div className='flex items-center'>
          <Link href='/admin-dashboard' className='text-gray-800 hover:text-gray-600 mr-4'>
            Admin Dashboard
          </Link>
          <a href='#' className='text-red-500 hover:text-red-700 mr-4' onClick={handleLogout}>
            Logout
          </a>
        </div>
      );
    }

    if (isLoggedIn) {
      return (
        <div className='flex items-center'>
          <Link href='/dashboard' className='text-gray-800 hover:text-gray-600 mr-4'>
            Dashboard
          </Link>
          <a href='#' className='text-red-500 hover:text-red-700 mr-4' onClick={handleLogout}>
            Logout
          </a>
        </div>
      );
    }

    return (
      <div className='flex items-center'>
        <Link href='/login' className='text-gray-800 hover:text-gray-600 mr-4'>
          Login
        </Link>
        <Link href='/register' className='text-gray-800 hover:text-gray-600'>
          Register
        </Link>
      </div>
    );
  };

  /*   const menu =
    isLoggedIn && role === 'Admin' ? (
      <div className='flex items-center'>
        <Link href='/dashboard' className='text-gray-800 hover:text-gray-600 mr-4'>
          Dashboard
        </Link>
        <a href='#' className='text-red-500 hover:text-red-700 mr-4' onClick={handleLogout}>
          Logout
        </a>
      </div>
    ) : (
      <div className='flex items-center'>
        <Link href='/login' className='text-gray-800 hover:text-gray-600 mr-4'>
          Login
        </Link>
        <Link href='/register' className='text-gray-800 hover:text-gray-600'>
          Register
        </Link>
      </div>
    ); */

  return (
    <div className='min-h-screen bg-gray-100'>
      <nav className='flex justify-between w-full bg-white text-gray-800 shadow-sm py-4 px-6'>
        <Link href='/' className='text-2xl text-gray-800'>
          <span className='text-blue-500 font-bold'>HR</span> ASSISTANT
        </Link>
        {menu()}
      </nav>
      <main className='max-w-7xl mx-auto py-10 sm:px-6 lg:px-8'>{children}</main>
    </div>
  );
};

export default Layout;
