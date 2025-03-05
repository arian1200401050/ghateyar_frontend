import config from '#src/config.js';

import { mainArticles } from '../../db/mainArticles.js';

import './styles/suggestedArticlesRegal.scss';

function SuggestedArticlesRegal() {
    return (
        <div className="article-regal-wrapper">
            <div className="main-section article-regal my-5 mx-auto">
                <div className="article-regal__header row mb-3">
                    <div className="col-2 article-regal__header-title-wrapper">
                        <h4 className="article-regal__header-title gray-3">
                            وبلاگ
                        </h4>
                    </div>
                    <div className="col-8 article-regal__header-button-splitor">
                        <span className="article-regal__header-splitor mt-3 d-block w-100 h-0 border border-1 border-gray-3"></span>
                    </div>
                    <div className="col-2 article-regal__header-button-wrapper">
                        <span className="badge py-2 px-4 gray-3 border border-1 border-gray-3 rounded article-regal__header-button">
                            مشاهده عناوین بیشتر
                        </span>
                    </div>

                </div>
                <div className="article-regal__body py-3">
                    <div className="article-regal__inner-wrapper mx-3 py-2 overflow-hidden">
                        <div className="article-regal__inner d-flex w-fit-content">
                            {mainArticles.map((item, index) => (
                                <div key={index} className="card mx-2 border border-1 border-gray-1 shadow-sm article-card">
                                    <div className="w-100 h-100 m-0 article-card__inner">
                                        <div className="article-card__image-wrapper">
                                            <img src={`${config.MEDIA_ROOT}/${item.banner}`} alt={ item.title } 
                                                className="card-img-top h-100 object-fit-contain article-card__image" />
                                        </div>
                                        <div className="card-body pt-3 pe-3 h-100 border-top border-gray overflow-hidden text-end">
                                            <div className="article-card__title-wrapper">
                                                <a href={`${item.alias}`} alt={`${item.title}`}>
                                                    <h5 className="card-title fs-6 gray-3">{ item.title }</h5>
                                                </a>
                                            </div>
                                            <div className="article-card__text-wrapper">
                                                <p className="card-text article-card__text-wrapper">{ item.description }</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default SuggestedArticlesRegal;