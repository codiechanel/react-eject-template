import * as React from "react"

class UIRouterPlain extends React.Component<any, any> {

    matchRoute(children, routeSource) {
        let result = null
        React.Children.forEach(children, (child: any) => {
            if (routeSource == child.props.route) {
                result = child
            }
        })

        return result
    }
    render() {
        return this.matchRoute(this.props.children, this.props.routeSource)

    }
}

export default UIRouterPlain
