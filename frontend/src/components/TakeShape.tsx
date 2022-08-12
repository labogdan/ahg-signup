import React, { useEffect, useState } from "react";

export interface TakeShapeInterface {
    position: any;
}

export interface TakeShapeContactInterface {
    content: any;
}

export const TakeShapeContact: React.FC<TakeShapeContactInterface> = content => {
    return (
        <>
            <h1>{content.content.getSignUpPage.signUpPage.header}</h1>
        </>
    );
};

export const TakeShape: React.FC<TakeShapeInterface> = position => {
    const [isFetched, setIsFetched] = useState(false);
    const [dynamicContent, setDynamicContent] = useState();

    const contactQuery = JSON.stringify({
        query: `
        {
          getSignUpPage {
            _id
            handbook {
              text
              url
            }
            participationPolicy {
              text
              url
            }
            signUpPage {
              header
              subHeader
            }
          }
        }
      `,
    });

    const queryData = async () => {
        let query;

        switch (position.position) {
            default:
                query = null;
                break;
            case "contact":
                query = contactQuery;
                break;
        }

        // @ts-ignore
        const response = await fetch(process.env.REACT_APP_TAKESHAPE_ENDPOINT, {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${process.env.REACT_APP_TAKESHAPE_KEY}`,
            },
            method: "POST",
            body: query,
        });

        const responseJson = await response.json();
        return responseJson.data;
    };

    const fetchData = async () => {
        const res = await queryData();
        setDynamicContent(res);
    };

    // @ts-ignore
    useEffect(() => {
        let mounted = true;
        fetchData().then(r => {
            if (mounted) {
                setIsFetched(true);
            }
        });
        // eslint-disable-next-line no-return-assign
        return () => (mounted = false);
    }, [isFetched]);
    if (!dynamicContent) {
        return null;
    }

    if (position.position === "contact") {
        return (
            <>
                <TakeShapeContact content={dynamicContent} />
            </>
        );
    }

    return (
        <></>
    )
}
