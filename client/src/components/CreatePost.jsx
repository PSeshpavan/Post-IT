import React from 'react'

const PHeader = () => {
    return (
        <div>Header</div>
    )
}

const PFooter = () => {
    return (
        <div>Footer</div>
    )
}

const CreatePost = () => {
    return (
        <div className=''>
            <PHeader />
            <div>
                CreatePost
                <img src="" alt="" />
            </div>
            <PFooter />
        </div>
    )
}

export default CreatePost