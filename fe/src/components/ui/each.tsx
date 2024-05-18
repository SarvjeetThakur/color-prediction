import * as React from 'react'


declare type EachProps = {
    render: (item: any, index: number) => void;
    of: any
};

const Each: React.FC<EachProps> = ({ render, of }) => React.Children.toArray(of.map((item: any, index: number) => render(item, index)))

export default Each