import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ArticleDetail from '../DetailArticle/ArticleDetail';
import './Article.css';

interface ArticleProps {
    title: string;
    prix: string;
    detail: string;
    theme: string;
    taille: string;
    imageUrl?: string; // Optional property for image URL
}

const Article: React.FC<ArticleProps> = ({ title, prix, detail, taille, imageUrl }) => {
    const [showDetail, setShowDetail] = useState(false);

    const handleImageClick = () => {
        setShowDetail(true);
    };

    const handleCloseDetail = () => {
        setShowDetail(false);
    };

    const handleOverlayClick = () => {
        setShowDetail(false);
    };

    return (
        <div className='article'>
            {imageUrl && <img src={imageUrl} alt={title} onClick={handleImageClick} />}
            <h1>{title}</h1>
            <p>{prix}</p>
            <AnimatePresence>
                {showDetail && (
                    <>
                        <div className='overlay' onClick={handleOverlayClick}></div>
                        <ArticleDetail 
                            title={title} 
                            prix={prix} 
                            detail={detail}
                            taille={taille}
                            onClose={handleCloseDetail} 
                        />
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Article;