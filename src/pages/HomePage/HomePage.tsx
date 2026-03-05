import Header from '../../components/Header';
import Footer from '../../components/Footer/Footer';
import './HomePage.css';

export function HomePage() {
    return (
        <>
            <Header activeLink="arena" />
            <div>This is Home Page</div>
            <Footer />
        </>
    )
}