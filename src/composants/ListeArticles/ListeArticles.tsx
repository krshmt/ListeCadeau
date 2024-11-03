import React, { useState, useEffect } from 'react';
import Article from '../Article/Article';
import './ListeArticles.css';

interface Article {
    title: string;
    prix: string;
    detail: string;
    theme: string;
    taille: string;
    imageUrl: string;
}

const ListeArticles: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState('');
    const [selectedTheme, setSelectedTheme] = useState('');

    useEffect(() => {
        fetch('https://krshmt.github.io/portfolio-premiere-annee/data.json')
            .then(response => response.json())
            .then(data => setArticles(data['articles']))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handlePriceRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPriceRange(e.target.value);
    };

    const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTheme(e.target.value);
    };

    const filteredArticles = articles.filter(article => {
        const price = parseFloat(article.prix.replace('€', ''));
        let min = 0;
        let max = Infinity;

        if (selectedPriceRange === '10-20') {
            min = 10;
            max = 20;
        } else if (selectedPriceRange === '20-40') {
            min = 20;
            max = 40;
        } else if (selectedPriceRange === '40-80') {
            min = 40;
            max = 80;
        }

        return (
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            price >= min &&
            price <= max &&
            (selectedTheme === '' || article.theme === selectedTheme)
        );
    });

    return (
        <>
        <div className='search__filter'>
                <input 
                    type='text' 
                    placeholder='Search...' 
                    value={searchQuery} 
                    onChange={handleSearchChange} 
                />
                <select value={selectedPriceRange} onChange={handlePriceRangeChange}>
                    <option value=''>All Prices</option>
                    <option value='10-20'>10-20€</option>
                    <option value='20-40'>20-40€</option>
                    <option value='40-80'>40-80€</option>
                </select>
                <select value={selectedTheme} onChange={handleThemeChange}>
                    <option value=''>All Themes</option>
                    <option value='Vêtement'>Vêtement</option>
                    <option value='Complément Alimentaire'>Complément Alimentaire</option>
                    <option value='Autre'>Autre</option>
                </select>
            </div>
            <div className='center'>
                <div className="liste__articles">
                {filteredArticles.map((article, index) => (
                <Article 
                    key={index} 
                    title={article.title} 
                    detail={article.detail}
                    prix={article.prix} 
                    theme={article.theme} 
                    taille={article.taille}
                    imageUrl={article.imageUrl} 
                />
            ))}
                </div>
        </div>
        </>
    );
};

export default ListeArticles;