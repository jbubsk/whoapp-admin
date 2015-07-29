module.exports = {
    port: process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip_address: process.env.OPENSHIFT_NODEJS_IP || '172.16.16.114',
    ACCESS_LOG_CODE: 200,
    STATIC_PATH: 'build/dist'
};