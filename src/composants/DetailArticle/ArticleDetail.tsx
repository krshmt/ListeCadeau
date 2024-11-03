import React from 'react';
import { motion } from 'framer-motion';
import './ArticleDetail.css';

interface ArticleDetailProps {
    title: string;
    prix: string;
    detail: string;
    taille: string;
    onClose: () => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ title, prix, detail, taille }) => {
    return (
        <motion.div 
            className='article-detail'
            initial={{ width: 0 }}
            animate={{ width: '25vw' }}
            exit={{ width: 0 }}
        >
            <div className="test">
            <h1>{title}</h1>
            <p>Prix : {prix}</p>
            <p>{detail}</p>
            <p>Taille : {taille}</p>
            </div>
        </motion.div>
    );
};

export default ArticleDetail;