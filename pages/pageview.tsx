import React from "react";
import { NextContext } from "next";
import { PageData } from "../src/types";
import { getInitialPageProps } from "../src/data";
import { Heading } from "../components/heading";
import { Reactify } from "../components/reactify";
import { interactiveInjector, sourceViewInjector } from "../injectors";
import { YouAreHere } from "../components/breadcrumbs";

export default class PageView extends React.Component<PageData> {
    static getInitialProps(context: NextContext) {
        return getInitialPageProps(context);
    }
    render() {
        const props = this.props;
        const body = props.page.body;

        return (
            <div itemScope itemType="http://schema.org/Chapter">
                <Heading
                    next={props.page.next}
                    prev={props.page.prev}
                    parent={props.page.parents.length > 0 ? props.page.parents[0] : null}
                    searchUrl="/static/lunr.json"
                    titles={props.titles}
                    toc={props.toc}
                />
                <div style={{ float: "right", marginRight: "20px" }}>
                    <p>
                        <a href="https://github.com/mtiller/ModelicaBook">
                            <img
                                style={{ width: "1em", verticalAlign: "middle" }}
                                src="/static/images/GitHub-Mark-64px.png"
                            />
                        </a>
                        <span>
                            {" "}
                            Found an issue with the book? Report it on{" "}
                            <a href="https://github.com/mtiller/ModelicaBook/issues">Github.</a>
                        </span>
                    </p>
                </div>

                <YouAreHere {...props} />

                <div style={{ margin: 20 }}>
                    <span itemProp="name" style={{ display: "none" }}>
                        {props.page.title}
                    </span>
                    <link
                        style={{ display: "none" }}
                        itemProp="isPartOf"
                        itemScope
                        itemType="http://schema.org/Book"
                        itemID="https://mbe.modelica.university"
                    />
                    <Reactify html={body} injectors={[interactiveInjector, sourceViewInjector]} />
                </div>
            </div>
        );
    }
}
