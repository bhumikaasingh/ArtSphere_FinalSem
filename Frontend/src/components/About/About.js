import './About.css';
import React from 'react';
function About() {
    return (
        <div className="about-container">
            <div className="about-section">
                <div className="about-text">
                    <h1>Our History</h1>
                    <p>
                        Over the years, our unwavering dedication to excellence and creativity has transformed ArtSphere into a trusted name in the art community. From our humble beginnings, we have passionately supported artists and art enthusiasts, bringing unique creations into homes, galleries, and personal collections. Each piece we offer tells a story, embodying the emotions, perspectives, and inspirations of its creator. Our journey has been graced by countless exhibitions, collaborations, and connections with artists and collectors worldwide.
                    </p>
                </div>
                <div className="about-image">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW7-AD33vRzqlXk8ji3KaAef9ZDynqvv2NYA&s" alt="Our History" />
                </div>
            </div>
            <div className="about-section">
                <div className="about-image">
                    <img src="https://media.architecturaldigest.com/photos/624cb571b79451cd757d2164/16:9/w_2560%2Cc_limit/artwork-cool-paintings-art-prints-2022-2.jpg" alt="Our Mission" />
                </div>
                <div className="about-text">
                    <h1>Our Mission</h1>
                    <p>
                        At ArtSphere, our mission is to celebrate creativity by connecting artists and art lovers through thoughtfully curated pieces that inspire, evoke emotion, and bring beauty into everyday life. Through our carefully selected collections, personalized experiences, and unwavering dedication to quality, we aim to foster connections, support artistic expression, and create lasting impressions in the hearts of our community.
                    </p>
                </div>
            </div>
            <div className="about-section">
                <div className="about-text">
                    <h1>Our Vision</h1>
                    <p>
                        Our vision is to establish ArtSphere as the premier destination for those seeking exceptional art that transcends mere aesthetics. We aspire to be a sanctuary of creativity and inspiration, where each piece tells a story, sparks emotion, and connects people through the universal language of art.
                    </p>
                </div>
                <div className="about-image">
                    <img src="https://cdn.shopify.com/s/files/1/0070/7032/articles/Shopify_ArtWindowsmany_HEADER_26dc2200-b83f-443c-a4af-52bdfab2ce54.jpg?v=1730128485" alt="Our Vision" />
                </div>
            </div>
        </div>
    );
}

export default About;
