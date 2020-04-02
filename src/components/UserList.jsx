import React from 'react'

export default ({
    userList,
    handleRemove
}) => {

    return (
        <div>
            <h1>User List</h1>
            {
                userList.map((name, index) => (
                    <div key={index}>
                        <button onClick={() => handleRemove(name)}>
                            Remove
                        </button>
                        {index + 1}. {name}
                    </div>
                ))
            }
        </div>
    )
}