import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import config from "#src/config.js";
import { useScreenWidth } from "#src/context/ScreenWidthContext";


function SummaryHeader ({product}) {
	return (
		<div id="summary-header" className="mb-3 md:!mb-0 flex flex-row-reverse justify-end md:!block">
			<div className="mb-2">
				{/* Menu Navigation Bar */}
				<nav>
					<ul className="flex space-x-4 m-0 flex-wrap">
						{product.menu?.map((menu, index) => {
							console.log(menu)
							return (
								<li key={index} className={`${index < product.menu.length - 1 && "after:content-['/']"}
									after:relative after:right-2 after:text-xs`}>
									<Link to={`/menu/${menu.menu_id}`} className="!text-sky-400 text-lg md:!text-xs font-bold">
										{menu.title}
									</Link>
								</li>
							)
						})}
					</ul>
				</nav>
			</div>
			<div className="ml-8 md:!m-0">
				{/* Product Name */}
				<h1 className="text-xl md:!text-base !font-bold">
					{product.title}
				</h1>
			</div>
		</div>
	);
}

function SummaryMetaTag ({product}) {
	return (
		<div id="summary-metatag" className="flex gap-x-4 mb-2 md!:m-0" >
			{/* Points */}
			<div className="flex items-center gap-x-1">
				<span className={`h-0 w-0 p-1.75 inline-block bg-contain bg-no-repeat bg-center`}
					style={{backgroundImage: `url(/icon/star-yellow.png)`}}
				></span>
				<span className="text-base md:!text-sm">{product.score}</span> 
				<span className="text-md md:!text-xs text-gray-400">(امتیاز {product.buyCount} خرید)</span>
			</div>

			{/* Number of Comments */}
			<div className="flex items-center">
				<Link to="#comments" className="rounded-xl bg-gray-200 hover:!bg-gray-200 text-black text-md md:!text-xs pb-0.5 px-2
					after:content-['\203A'] after:text-base after:mr-2">
					{product.commentsCount} دیدگاه
				</Link>
			</div>
		</div>
	);
}

function SummaryProduct ({ product }) {
	const [activeImage, setActiveImage] = useState(product?.images?.[0] || null);
	const summarySection = useRef();
	const { screenWidth, isMobile } = useScreenWidth();

	useEffect(() => {
		const setBlowUp = () => {
			if (typeof $ !== 'undefined') {  
				$("#product-image").blowup({
					width : 400, // طول لنز
					height : 400, // ارتفاع لنز
					scale : 1,  //مقیاس بزرگنمایی
					// background : '#6e9cdb', // رنگ پس زمینه در صورتی که از تصویر بیرون رفت
					// border : '2px solid #777', // حاشیه لنز
					// round : true, // اینکه لنز گرد باشد یا خیر
					// shadow : 'none' // ویژگی های سایه
				});
			}
		}

		if (!isMobile) {
			setBlowUp();
		}
	}, [activeImage])

	return (   
		<div className="mx-auto flex flex-col md:!flex-row justify-center items-stretch gap-x-4 "
			id="product-summary" ref={summarySection}
		>
			{ isMobile && ( 
				<div className="border-b-1 border-gray-400 pb-3">
					<SummaryHeader product={product} />
					<SummaryMetaTag product={product} />
				</div>
			 ) }
			<div className="w-full md:!w-4/12">
				<div>
					<div className="flex justify-center items-center mb-4 md:!mb-0 md:!p-10">
						<img
							src={`${activeImage}`} alt={product.title}
							className="w-[80%] md:!w-full h-auto rounded-lg object-contain"
							id="product-image"
						/>
					</div>

					<div className="flex space-x-2">
						{product.images?.map((image, index) => (
							<img
								key={index}
								src={`${image}`}
								alt={`${product.title} thumbnail ${index + 1}`}
								className="w-20 h-20 cursor-pointer rounded-lg border-1 border-gray-400 hover:shadow-md"
								onClick={() => setActiveImage(image)}
							/>
						))}
					</div>
				</div>
			</div>
			<div className="md:!w-8/12 flex flex-col">
				{ !isMobile && ( <SummaryHeader product={product} /> ) }
				<div className="flex flex-col md:!flex-row gap-x-4 grow">
					<div className="md:!w-8/12 md:border-t-1 md:border-gray-400 mt-4 md:!pt-3 md:!mt-1 flex flex-col">
						{ !isMobile && ( <SummaryMetaTag product={product} />)}
						<div>
							{/* General Features (Vertical List) */}
							<div className="mt-3">
								<div>
									<h2 className="text-xl md:!text-base !font-bold mb-4">ویژگی ها</h2>
								</div>
								<div className="grid grid-cols-3 gap-x-2 gap-y-2">
									{
										product.attributes && Object.entries(product.attributes?.primary).map(([key, value], index) => (
											<div key={index} className="flex py-3 px-3 !pl-[20%]
												rounded-lg bg-gray-100 !shadow-xs shadow-gray-300">
												<span className="inline-block text-gray-500 text-lg md:!text-sm 
													after:content-[':'] after:mr-1 after:ml-2"
												>
													{key}
												</span>
												<span className="text-lg md:!text-sm mr-1"> {value}</span>
											</div>
										))
									}
								</div>
							</div>
							<div className="mt-4 text-justify leading-8">
								{/* <h3 className="!text-base !font-bold mb-3">معرفی</h3> */}
								<p className="text-lg/12 md:!text-md/8">{product.description}</p>
							</div>
						</div>
						<div className="mt-auto">
							{/* Tags (Horizontal List) */}
							<div className="flex space-x-2 border-t-1 border-gray-400 mt-4 pt-3">
								{product.category_set.map((item, index) => (
									<Link key={index}
										className="bg-blue-600 text-xl md:!text-base text-white px-3 py-2 rounded-md !shadow-xs !shadow-gray-800">
										{item.title}
									</Link>
								))}
							</div>
						</div>
					</div>
					<div className="mt-8 mb-4 pb-6 md:!p-0 md:!m-0 md:!w-4/12 border-b-1 border-gray-400 md:border-0">
						{/* Price Rectangle */}
						<div className="bg-gray-100 py-5 px-3 md:!p-3 rounded-md border-1 border-gray-300">
							<div>
								<div className="text-left">
									<span className="text-2xl md:!text-xl font-bold"> {Number(product.price).toLocaleString()} </span>
									<span className="text-lg md:!text-sm">تومان</span>
								</div>
								<div>
									<span className="block text-center rounded-md text-xl md:!text-sm py-4 md:!py-2 px-3 mt-6 md:!mt-3
										bg-rose-600 text-white cursor-pointer">تماس با ما</span>
								</div>
							</div>
						</div>

						<div className="">
							{/* Video Card */}
							<div className="mt-3 bg-gray-100 py-4 px-2 rounded-md border-1 border-gray-300">
								<div>
									<span className="mr-4 text-xl md:!text-lg font-semibold">ویدیوها</span>
								</div>
								<div className="pt-5 pr-5 md:!pt-3 md:!pr-2">
									<Link to={`/video/${product.video.video_id}`} className="block w-fit text-blue-500">
										<div className="flex w-fit">
											<div className="w-50 h-30 md:!w-35 md:!h-20 rounded-md overflow-hidden">
												<img src={`${config.MEDIA_ROOT}/video/${product.video.video_id}/thumbnail.jpg`} 
													alt={product.video.title}
													className="w-full h-full object-cover" />
											</div>
											<div className="flex items-center">
												<h4 className="text-xl md:!text-base !text-gray-900 mr-8 md:!mr-3 font-medium">
													{product.video.title}
												</h4>
											</div>
										</div>
									</Link>
								</div>
							</div>

							{/* Article Card */}
							<div className="mt-4 bg-gray-100 py-4 px-2 rounded-md border-1 border-gray-300">
								<div>
									<span className="mr-4 text-xl md:!text-lg font-semibold">مقالات</span>
								</div>
								<div className="pt-5 pr-5 md:!pt-3 md:!pr-2">
									<Link to={`/mag/${product.article.article_id}`} className="block w-fit text-blue-500">
										<div className="flex w-fit">
											<div className="w-50 h-30 md:!w-35 md:!h-20 rounded-md overflow-hidden">
												<img src={`${config.MEDIA_ROOT}/article/${product.article.article_id}/thumbnail.jpg`} 
													alt={product.article.title}
													className="w-full h-full object-cover" />
											</div>
											<div className="flex items-center">
												<h4 className="text-xl md:!text-base !text-gray-900 mr-8 md:!mr-3 font-medium">
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
}

export default SummaryProduct;
