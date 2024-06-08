import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Layout from './layouts/Layout';

const WithAuth = (WrappedComponent: React.ComponentType<any>, allowedRoles: string[]) => {
  const Wrapper = (props: any) => {
    const role = useSelector((state: RootState) => state.auth.role);
    console.log(allowedRoles);

    if (!role.some((r) => allowedRoles.includes(r))) {
      return (
        <Layout>
          <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
            <div className='px-4 py-6 sm:px-0'>
              <div className='border-4 border-dashed border-gray-200 rounded-lg h-96'>
                <div className='flex items-center justify-center h-full'>
                  <h1 className='text-4xl font-bold text-gray-500'>Unauthorized Access</h1>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

const getAllowedRoles = (pathname: string) => {
  if (pathname.startsWith('/dashboard')) {
    return ['HrManager'];
  } else if (pathname.startsWith('/admin-dashboard')) {
    return ['Admin'];
  } else {
    return [];
  }
};

export default WithAuth;