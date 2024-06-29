function validateStatus(status) {
    const REPORT_STATUS = ['new', 'assigned', 'analyzing', 'closed']
    return REPORT_STATUS.includes(status)

}


module.exports = { validateStatus };