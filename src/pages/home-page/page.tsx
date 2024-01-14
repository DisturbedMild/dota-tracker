import {
	QueryClient,
	QueryClientProvider
} from '@tanstack/react-query';

import HeroesList from '../../components/Heroes/HeroesList/component';

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