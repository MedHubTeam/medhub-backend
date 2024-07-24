/**
 * @param {import('express').Application} app
 */
module.exports = (app) => {
    app.get('/list', (req, res) => {
        const routes = []
        
        app._router.stack.forEach(middleware => {
            if (middleware.route) { 
                routes.push({ method: Object.keys(middleware.route.methods)[0], path: middleware.route.path.replace(/[^a-zA-Z\/]/g, '').replace(/\/{2,}/g, '') })
            } else if (middleware.name === 'router') {
                middleware.handle.stack.forEach(handler => {
                    if (handler.route) {
                        routes.push({ method: Object.keys(handler.route.methods)[0], path: middleware.regexp.source.replace(/[^a-zA-Z\/]/g, '').replace(/\/{2,}/g, '') + handler.route.path })
                    }
                })
            }
        })
        
        const structuredRoutes = {}
        routes.forEach(route => {
            const parts = route.path.split('/').filter(Boolean)
            let currentLevel = structuredRoutes

            parts.forEach((part, index) => {
                if (!currentLevel[part]) {
                    currentLevel[part] = {}
                }
                currentLevel = currentLevel[part]
            })
    
            currentLevel['method'] = route.method
        })
    
        res.json(structuredRoutes)
    })
}