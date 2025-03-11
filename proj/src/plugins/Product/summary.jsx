import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import config from "#src/config.js";

const SummaryProduct = ({ product }) => {
	const [activeImage, setActiveImage] = useState(product.images[0]);
	const summarySection = useRef();

	useEffect(() => {
		console.log(product);
	}, []);

	// should be substituted with translation solution
	const getLabel = (label) => {
		switch (label) {
			case ('price'): return 'قیمت'
			case ('color'): return 'رنگ'
			case ('material'): return 'جنس'
			case ('weight'): return 'وزن'
			case ('width'): return 'عرض'
			case ('length'): return 'طول'
			case ('height'): return 'ارتفاع'
			case (''): return ''
			default: return label
		}
	}

	return (
		<div className="mx-auto flex justify-center items-stretch gap-x-4"
			ref={summarySection}
		>
			<div className="w-4/12">
				<div>
					<div className="flex justify-center items-center p-10">
						<img
							src={`${config.MEDIA_ROOT}/product/${activeImage}`}
							alt={product.title}
							className="w-full h-auto rounded-lg"
						/>
					</div>

					<div className="flex space-x-2">
						{product.images.map((image, index) => (
							<img
								key={index}
								src={`${config.MEDIA_ROOT}/product/${image}`}
								alt={`${product.title} thumbnail ${index + 1}`}
								className="w-20 h-20 cursor-pointer rounded-lg border-1 border-gray-400 hover:shadow-md"
								onClick={() => setActiveImage(image)}
							/>
						))}
					</div>
				</div>
			</div>
			<div className="w-8/12 flex flex-col">
				<div className="">
					<div className="mb-2">
						{/* Menu Navigation Bar */}
						<nav>
							<ul className="flex space-x-4 m-0">
								{product.menus.map((menu, index) => (
									<li key={index} className={`${index < product.menus.length - 1 && "after:content-['/']"}
										after:relative after:right-2 after:text-xs`}>
										<Link to={`/menu/${menu.menuId}`} className="!text-sky-400 text-xs font-bold">
											{menu.title}
										</Link>
									</li>
								))}
							</ul>
						</nav>
					</div>
					<div>
						{/* Product Name */}
						<h1 className="!text-base !font-bold">
							{product.title}
						</h1>
					</div>
				</div>
				<div className="flex gap-x-4 grow">
					<div className="w-8/12 border-t-1 border-gray-400 pt-3 mt-1 flex flex-col">
						<div className="flex gap-x-4">
							{/* Points */}
							<div className="flex items-center gap-x-1">
								<span className={`h-0 w-0 p-1.75 inline-block bg-contain bg-no-repeat bg-center`}
									style={{backgroundImage: `url(${config.MEDIA_ROOT}/icon/other/star-yellow.png)`}}
								></span>
								<span className="text-sm">{product.score}</span> 
								<span className="text-xs text-gray-400">(امتیاز {product.buyCount} خرید)</span>
							</div>

							{/* Number of Comments */}
							<div className="flex items-center">
								<Link to="#comments" className="rounded-xl bg-gray-200 text-black text-xs pb-0.5 px-2
									after:content-['\203A'] after:text-base after:mr-2">
									{product.commentsCount} دیدگاه
								</Link>
							</div>
						</div>
						<div>
							{/* General Features (Vertical List) */}
							<div className="mt-3">
								<div>
									<h2 className="!text-base !font-bold mb-4">ویژگی ها</h2>
								</div>
								<div className="grid grid-cols-3 gap-x-2 gap-y-2">
									{Object.entries(product.mainAttributes).map(([label, value], index) => (
										<div key={index} className="flex  py-3 px-3 !pl-[20%]
											rounded-lg bg-gray-100 !shadow-xs shadow-gray-300">
											<span className="inline-block text-gray-500 text-sm 
												after:content-[':'] after:mr-1 after:ml-2"
											>
												{getLabel(label)}
											</span>
											<span className="text-sm mr-1"> {value}</span>
										</div>
									))}
								</div>
							</div>
							<div className="mt-4 text-justify text-sm leading-8">
								{/* <h3 className="!text-base !font-bold mb-3">معرفی</h3> */}
								<p>{product.description}</p>
							</div>
						</div>
						<div className="mt-auto">
							{/* Tags (Horizontal List) */}
							<div className="flex space-x-2 border-t-1 border-gray-400 mt-4 pt-3">
								{product.categories.map((item, index) => (
									<Link key={index} to={`/category/${item.categoryId}`} 
										className="bg-blue-600 text-white px-3 py-2 rounded-md !shadow-xs !shadow-gray-800">
										{item.title}
									</Link>
								))}
							</div>
						</div>
					</div>
					<div className="w-4/12">
						{/* Price Rectangle */}
						<div className="bg-gray-100 p-3 rounded-md border-1 border-gray-300">
							<div>
								<div className="text-left">
									<span className="text-xl font-bold"> {product.price} </span>
									<span className="text-sm">تومان</span>
								</div>
								<div>
									<span className="block text-center rounded-md text-sm py-2 px-3 mt-3
										bg-rose-600 text-white cursor-pointer">تماس با ما</span>
								</div>
							</div>
						</div>

						<div className="">
							{/* Video Card */}
							<div className="mt-3">
								<div>
									<span>ویدیو ها</span>
								</div>
								<div className="mt-3 mr-2">
									<Link to={`/video/${product.video.id}`} className="text-blue-500">
										<div className="border-1 border-gray-300 shadow-xs shadow-gray-300 rounded-md flex h-23">
											<div className="w-4/12 rounded-md overflow-hidden">
												<img src={`${config.MEDIA_ROOT}/video/${product.video.id}/thumbnail.jpg`} 
													alt={product.video.title}
													className="w-full h-full p-2 object-contain" />
											</div>
											<div className="w-8/12 flex items-center">
												<h4 className="!text-base !text-gray-800 mr-1">
													{product.video.title}
												</h4>
											</div>
										</div>
									</Link>
								</div>
							</div>

							{/* Article Card */}
							<div className="mt-4">
								<div>
									<span>مقالات</span>
								</div>
								<div className="mt-3 mr-2">
									<Link to={`/mag/${product.article.id}`} className="text-blue-500">
										<div className="border-1 border-gray-300 shadow-xs shadow-gray-300 rounded-md flex h-23">
											<div className="w-4/12 rounded-md overflow-hidden br-">
												<img src={`${config.MEDIA_ROOT}/article/${product.article.id}/thumbnail.jpg`} 
													alt={product.video.title}
													className="w-full h-auto p-2 object-contain" />
											</div>
											<div className="w-8/12 flex items-center">
												<h4 className="!text-base !text-gray-800 mr-1">
													{product.article.title}
												</h4>
											</div>
										</div>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SummaryProduct;
