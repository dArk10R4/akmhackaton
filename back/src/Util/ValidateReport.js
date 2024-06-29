function validateStatus(status) {
    const REPORT_STATUS = ["not assigned", "assigned", "under investigation", "closed"]
    return REPORT_STATUS.includes(status)

}


module.exports = { validateStatus };