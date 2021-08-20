import React, { useState } from 'react'

import PayPal from './PayPal'

export default function Donations() {
    const [checkout, setCheckOut] = useState(false)
    return (
        <div >
            {checkout ? (
                <PayPal />
            ) : (
                <section className="text-gray-700 body-font overflow-hidden bg-gray-100" style={{height:`calc(100vh - 64px)`}}>
                    <div className="container px-5 py-24 mx-auto">
                        <div className="lg:w-4/5 mx-auto flex flex-wrap">
                            <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border-lg border-memory-c3 shadow-2xl" src="https://st3.depositphotos.com/17392768/i/600/depositphotos_359909338-stock-photo-sad-young-man-protected-coronavirus.jpg" />
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <h2 className="text-sm title-font text-gray-500 tracking-widest">Memories</h2>
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">Donations</h1>
                                <p className="leading-relaxed pb-5 border-b-2 border-gray-200 mb-5 text-justify">Many people who suffer from covid need financial support, to be able to restore their lives, either because they lost a family member and need to pay expenses, or because they live completely day to day, that is why this initiative exists to support those who need it most..</p>
                                <div className="flex">
                                    <span className="title-font font-medium text-2xl text-gray-900">$10.00 USD</span>
                                    <button className="flex ml-auto text-memory-c6 bg-memory-c5 border-0 py-2 px-6 focus:outline-none hover:bg-memory-c4 rounded" onClick={() => setCheckOut(true)}>Donate</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>

    )
}
