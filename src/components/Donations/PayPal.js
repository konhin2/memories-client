import React, { useRef, useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

export default function PayPal() {
    const [success, setSuccess] = useState(false)
    const paypal = useRef()
    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, error) => {
                return actions.order.create({
                    intent: 'CAPTURE',
                    purchase_units: [{
                        description: 'Donation',
                        amount: {
                            currency_code: 'USD',
                            value: 10.00
                        }
                    }]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture()
                console.log(order)
                setSuccess(true)
            },
            onError: err => {
                console.log(err)
            }
        }).render(paypal.current)
    }, [])
    return (
        <>
            {
                !success ?
                    (
                        <div className='flex justify-center items-center' style={{ height: `calc(100vh - 64px)` }}>
                            <div ref={paypal}></div>
                        </div>
                    ) :
                    (
                        <div className='flex justify-center items-center' style={{ height: `calc(100vh - 64px)` }}>
                            <div class="rounded-md bg-green-50 p-4">
                                <div class="flex">
                                    <div class="flex-shrink-0">
                                        <svg class="h-5 w-5 text-memory-c2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <div class="ml-3">
                                        <p class="text-sm font-medium text-green-800">
                                            Successful Payment
                                        </p>
                                    </div>
                                    <div class="ml-auto pl-3">
                                        <div class="-mx-1.5 -my-1.5">
                                            <Link to='/memories' class="inline-flex bg-green-50 rounded-md p-1.5 text-memory-c1 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600">
                                                <span class="sr-only">Dismiss</span>
                                                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }
        </>
    )
}