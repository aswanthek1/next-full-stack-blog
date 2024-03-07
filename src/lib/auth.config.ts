export const authConfig = {
    pages: {
        signIn: '/login'
    },
    providers: [],
    callbacks: {
        async jwt({token, user}) {
            if(user) {
                token.id = user._id
                token.isAdmin = user?.isAdmin
            }
            return token
        },
        async session({session, token}) {
            if(token) {
                session.user.id = token?.id
                session.user.isAdmin = token?.isAdmin
            }
            return session
        },
        authorized({auth, request}) {
            console.log(auth, 'auth')
            const user = auth?.user;
            const isOnAdminPanel = request.nextUrl?.pathname?.startsWith("/admin");
            const isOnBlogPage = request.nextUrl?.pathname?.startsWith("/blog");
            const isOnLoginPage = request.nextUrl?.pathname?.startsWith("/login");
            const isOnRegisterPage = request.nextUrl?.pathname?.startsWith("/register");

            // ONLY ADMIN CAN REACT ADMIN PANEL
            if(isOnAdminPanel && !user?.isAdmin) {
                return false
            }

            // ONLY LOGGED IN USER CAN SEE BLOG PAGES
            if(isOnBlogPage && !user) {
                return false
            }

            // LOGGED OUT USER CAN SEE LOGIN PAGE
            if((isOnLoginPage || isOnRegisterPage) && user) {
                return Response.redirect(new URL('/', request.nextUrl))
            }

            return true
        }
    }
}