import React from "react";
import { NextContext } from "next";
import { PageData } from "./types";
import { getInitialPageProps } from "./data";
import { Heading } from "./heading";
import { IBreadcrumbProps, Breadcrumbs } from "@blueprintjs/core";

const Parents = (props: PageData) => {
    const parents: IBreadcrumbProps[] = props.page.parents.map(parent => ({ href: parent.link, text: parent.title }));
    const breadcrumbs: IBreadcrumbProps[] = [{ text: "Home", href: "/" }, ...parents, { text: props.page.title }];
    return (
        <div style={{ margin: 20 }}>
            <Breadcrumbs items={breadcrumbs} />
        </div>
    );
};

export default class PageView extends React.Component<PageData> {
    static getInitialProps(context: NextContext) {
        return getInitialPageProps(context);
    }
    render() {
        const props = this.props;
        const body = props.page.body;

        return (
            <div>
                <Heading next={props.page.next} prev={props.page.prev} />
                <Parents {...props} />

                <div style={{ margin: 20 }}>
                    <div dangerouslySetInnerHTML={{ __html: props.page.body }} />
                </div>
                {/* <pre>{body}</pre>
                <pre>{JSON.stringify({ ...props, url: null }, null, 4)}</pre> */}
            </div>
        );
    }
}
