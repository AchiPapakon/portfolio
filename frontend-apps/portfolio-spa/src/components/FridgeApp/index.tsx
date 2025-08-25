import ShowcaseContainer from '../ShowcaseContainer';
import RecipesProvider from './RecipesProvider';
import Content from './Content';

const FridgeApp = () => {
    return (
        <ShowcaseContainer sx={{ backgroundColor: 'black' }}>
            <RecipesProvider>
                <Content />
            </RecipesProvider>
        </ShowcaseContainer>
    );
};

export default FridgeApp;
