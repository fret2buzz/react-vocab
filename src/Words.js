import React from 'react';
import { readString } from 'react-papaparse';

class Words extends React.Component {
    state = {
        value: "en;translation;\nscattered;раскиданный\npaddle;весло\ndebunk;разоблачать",
    }
    shuffle = (array) => {
        var arrayNew = readString(array, {
            delimiter: ';',
            skipEmptyLines: true,
            header: true
        })
        arrayNew = arrayNew.data;
        var m = arrayNew.length, t, i;

        // While there remain elements to shuffle…
        while (m) {
            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = arrayNew[m];
            arrayNew[m] = arrayNew[i];
            arrayNew[i] = t;
        }
        return arrayNew;
    }
    passWords = () => {
        var data = this.shuffle(this.state.value);
        this.props.updateWords(data);
    }
    componentDidMount() {
        window.addEventListener('DOMContentLoaded', this.passWords);
    }
    componentWillUnmount() {
        window.removeEventListener('DOMContentLoaded', this.passWords);
    }
    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }
    handleSubmit = (event) => {
        this.passWords();
        event.preventDefault();
    }
    render() {
        const { value } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <textarea className="word-textarea" cols="50" rows="10" value={value} onChange={this.handleChange} />
                <div className="word-buttons">
                    <input className="word-button" type="submit" value="Submit" />
                </div>
            </form>
        );
    }
}
export default Words;