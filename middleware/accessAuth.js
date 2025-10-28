const authMembers = JSON.parse(process.env.PASS_CODES || '[]')
const { Router } = require('express')

const router = Router()


const autherizeAccess = (req, res) => {
    try {
        const { role, passCode } = req.body
        const accessApproved = authMembers.find(member => 
            member.role?.toLowerCase() === role.toLowerCase() && member.passCode?.toLowerCase() === passCode.toLowerCase()
        )
        if (!accessApproved){
            return res.status(400).json({success: false, message: 'NOT AUTHERIZED!'})
        }
        res.status(200).json({success: true, message: 'access Approved', data: role})
    } catch (error) {
        console.error('Error autherizing access:', error);
        res.status(500).json({ message: 'Server error: ', error });
    }
}


router.post('/', autherizeAccess)


module.exports = router