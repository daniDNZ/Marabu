import NavLandPage from "../components/landPage/NavLandPage";
import ContactForm from "../components/landPage/ContactForm";
import SubHeadlines from "../components/landPage/SubHeadlines";
import Headline from "../components/landPage/Headline";
import ContactInfo from "../components/landPage/ContactInfo";

function LandPage() {
    document.body.classList.add("text-sm-center", "text-md-start", "d-flex", "h-100", "text-black", "bg-light");
    document.getElementById('root').classList.add("d-flex", "w-100", "h-100", "mx-0", "flex-column");

    return (
        <>
            <NavLandPage />
            <main className="d-flex flex-column">
                <Headline />
                <SubHeadlines />

            </main>
            <footer className="footer-land-page d-flex flex-column mt-auto py-3 text-white-50 text-center">
                <ContactForm />
                <ContactInfo />
                <p className="mt-3 mb-0">
                    Website by &nbsp;
                    <a className="text-white text-decoration-none" href="https://www.linkedin.com/in/danielsanzelguer/">Dani Sanz</a>
                    .
                </p>
            </footer>

        </>
    );
}

export default LandPage;
