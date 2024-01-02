import {
	QueryClient,
	QueryClientProvider
} from '@tanstack/react-query';


import HeroesList from '../components/Heroes/HeroesList';

function HomePage() {
	const queryClient = new QueryClient();
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<HeroesList />
			</QueryClientProvider>
		</>
	)
}

export default HomePage;