export default function ErrorMessage({ message }) {
    return (
        <div className='h-screen flex items-center justify-center'>
            <div className='bg-red-50 card border rounded-md px-4 text-center m-10 py-5'>
                <svg className="w-6 h-6 text-red-700 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"></path>
                </svg>
                <p className='text-red-700 font-semibold'>Error: {message}</p>
                <p className='text-gray-600'>Por favor, inténtalo de nuevo más tarde.</p>
            </div>
        </div>
    );
}