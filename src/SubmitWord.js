import React from 'react';

class WordLine extends React.PureComponent {
    render() {
        const { item, index } = this.props;

        return (
            <tr className={item.valid}>
                <td>{index + 1}.</td>
                <td className="word-enetered">{item.entered}</td>
                <td>{item.en}</td>
                <td className="word-pronunciations">{item.pronunciation}</td>
                <td>{item.translation}</td>
                <td className="word-definition">{item.definition}</td>
            </tr>
        )
    }
}

class SubmitWord extends React.Component {
    state = {
        value: ''
    }
    componentDidMount() {
        console.log("SubmitWord is mounted");
    }
    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }
    handleKey = (event) => {
        if (event.which === 13) { // enter
            this.handleClick(event);
        }
    }
    handleClick = (event) => {
        var words = this.props.words;
        var start = this.props.start;
        var score = this.props.score;
        var value = '';

        if (event.target.dataset && event.target.dataset.type === 'skip') {
            value = '---';
        } else {
            value = this.state.value.toLowerCase().trim();
        }

        this.setState({ value: '' });

        if (start < words.length && value !== '') {
            words[start]['entered'] = value;
            words[start]['valid'] = (value === words[start]['en']) ? 'valid' : '';
            if (words[start]['valid']) {
                score++;
            }
            start++;
            this.props.updateResult(words, start, score);
        }
        event.preventDefault();
    }
    render() {
        const { start, score, words } = this.props;
        const percentage = (start + 1) / words.length * 100;
        const progress = {
            width: percentage >= 100 ? '100%' : percentage + '%'
        };
        var newWords = words.filter((el) => (el.entered));
        return (
            <>
                <div className="word-app">
                    <div className="word-form">
                        <label className="word-label" htmlFor="word">English word:</label>
                        <input className="word-input" type="text" value={this.state.value} onChange={this.handleChange} onKeyUp={this.handleKey} />
                        <div className="word-buttons">
                            <button className="word-button" type="button" onClick={this.handleClick}>Submit</button>
                            <button className="word-button" type="button" data-type="skip" onClick={this.handleClick}>Skip</button>
                        </div>
                    </div>
                    <div className="word-block">
                        {words[start] && <>
                            <div className="word-translation">{start + 1}. {words[start].translation}</div>
                            <div className="word-def">{words[start].definition}</div>
                        </>}
                        <div className="word-progress" style={progress}></div>
                        <br />
                        <h2>Your result is {score} of {words.length}</h2>
                        <table className="word-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Your word</th>
                                    <th>English</th>
                                    <th>Pronunciation</th>
                                    <th>Translation</th>
                                    <th>Definition</th>
                                </tr>
                            </thead>
                            <tbody>
                                {newWords.map((word, index) => (
                                    <WordLine key={'word' + index} item={word} index={index} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }
}
export default SubmitWord;