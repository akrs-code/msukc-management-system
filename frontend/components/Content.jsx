import React from 'react'
import Header from './Header'
import PostForm from './PostForm'

const Content = () => {
    return (
        <div>
            <Header />
            <div className="bg-[#ffffff] pt-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-4">
                        <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-[#202020]">
                            CREATE <span className="text-[#BB2A1D]">POST</span>
                        </h1>
                        <p className="text-[#121212] text-sm font-montserrat mt-2">
                             Share stories, announcements, or event with your organization.
                        </p>
                    </div>
                    <PostForm />
                </div>
            </div>
        </div>
    )
}

export default Content