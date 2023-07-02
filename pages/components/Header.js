import VideoLogo from './logo_video'

function Header() {
    return (
        <>
            <section id='section-video'>
                <div id='logo-video'>
                    <VideoLogo/>
                </div>
            </section>
            <header>
                <nav>
                    <a>Home </a>
                    <a href="#section-world">PrincessA World </a>
                    <a href="#section-art">Artworks </a>
                    <a href="#section-shop">Shop </a>
                    <a href="#section-contact">Contact </a>
                </nav>
            </header>
        </>
    )
}

export default Header