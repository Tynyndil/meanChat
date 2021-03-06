/* 
Imports
*/
    // Node
    const bcrypt = require('bcryptjs');
    
    // Inner
    const UserModel = require('../../models/user.model');
//


/* 
Méthodes CRUD
*/
    const createItem = (body) => {
        return new Promise( (resolve, reject) => {
            // Look for used email
            UserModel.findOne( { email: body.email }, ( error, user ) => {
                if(error) return reject(error) // Mongo Error
                else if(user) return reject('User already exist')
                else {
                    // Hash user password
                    bcrypt.hash( body.password, 10 )
                    .then( hashedPassword => {
                        // Change user pasword
                        body.password = hashedPassword;

                        // Register new user
                        UserModel.create(body)
                        .then( mongoResponse => resolve(mongoResponse) )
                        .catch( mongoResponse => reject(mongoResponse) )
                    })
                    .catch( hashError => reject(hashError) );
                }
            })
        });
    };

    // Find by name or email
    const readItem = (body) => {
        return new Promise( ( resolve,reject ) => {
            // Listing all existing users
            UserModel.findOne( { $or : [ { name: body.name }, { email: body.email } ] }, function(error, user) {
                if(error) return reject(error) // Mongo Error
                else if(!user) return reject('User not found')
                else{
                    return resolve(user);
                } 
            });
        })
    }

    const readAllItem = () => {
        return new Promise( ( resolve, reject ) => {

        })
    }

    const updateItem = () => {

    }

    const deleteItem = () => {

    }
//

/* 
Exports
*/
    module.exports = {
        createItem,
        readItem,
        updateItem,
        deleteItem
    }
//