const express = require('express');
const router = express.Router(); // This initializes the express router
const uuid = require('uuid'); // This is used to generate unique ids
const members = require('../../Members');// This imports the members array from the members.js file

// EXAMPLE 3 (GET ALL MEMBERS)
// This creates an API endpoint that sends a response to the client
// router.get('/api/members', ...): This sets up a GET route at the /api/members path.
// res.json(members): When this route is accessed, it responds with the members array in JSON format.
router.get('/', (req, res) => {
    res.json(members);
});

// EXAMPLE 4 (GET SINGLE MEMBER ID)
router.get('/:id', (req, res) => {
    // This checks if the member with the specified id exists
    const found = members.some(member => member.id === parseInt(req.params.id));
   
    // This filters the members array to find the member with the specified id
    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
});

// EXAMPLE 5 (CREATE MEMBER)
// This creates a POST route that sends a response to the client
// The request body is the data that is sent to the server from the client.
// This data is sent in the body of the request.
// The request body can be accessed using req.body.
// uuid.v4(): This generates a unique id for the new member.
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    // This checks if the name and email fields are not empty
    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'Please include a name and email' });
    }
    // This adds the new member to the members array
    members.push(newMember);
    res.json(members);
    // res.redirect('/');

})

// EXAMPLE 6 (UPDATE A MEMBER ID)
router.put('/:id', (req, res) => {
    // This checks if the member with the specified id exists
    const found = members.some(member => member.id === parseInt(req.params.id));
   
    if(found){
        const updMember = req.body;// This gets the updated member details from the request body
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){// This checks if the member id matches the specified id from the request route
                member.name = updMember.name ? updMember.name : member.name;// This updates the member name if it exists in the request body
                member.email = updMember.email ? updMember.email : member.email;// This updates the member
            
                res.json({ msg: 'Member updated', member });
            }
        });
    } else{
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
});

// EXAMPLE 7 (DELETE MEMBER)
router.delete('/:id', (req, res) => {
    // This checks if the member with the specified id exists
    const found = members.some(member => member.id === parseInt(req.params.id));
   
    // This filters the members array to find the member with the specified id
    if (found) {
        res.json({msg: 'Member deleted', members:
            members.filter(member => member.id !== parseInt(req.params.id))});
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
});

module.exports = router; // This exports the router object