import React from 'react';
import './App.css';
import Words from './Words';
import SubmitWord from './SubmitWord';

class App extends React.Component {
    state = {
        words: [],
        start: 0,
        score: 0,
    }
    handleWords = (data) => {
        this.setState({
            words: data,
            start: 0,
            score: 0,
        }, () => {
            // console.log(this.state.words);
        });
    }
    handleResult = (a, b, c) => {
        this.setState({
            words: a,
            start: b,
            score: c,
        }, () => {
            console.log(this.state.words);
        });
    }
    render() {
        const {start, score, words} = this.state;
        let sumbitWordForm;
        if (words.length > 0) {
            sumbitWordForm = <SubmitWord words={words} start={start} score={score} updateResult={this.handleResult} />;
        }
        return (
            <>
                <h1>Vocabulary test</h1>
                <div className="word-container">
                    <div className="word-sidebar">
                        <Words updateWords={this.handleWords} />
                        <div className="usage">
                            <h2>Usage:</h2>
                            <p>
                                Create a spreadsheet document with 2 columns (A) for english word and (B) for translation. There are 2 optional columns 'definition' and 'pronunciations'.
                            </p>
                            <p>
                                Then add this formula <code>=CONCATENATE(A1,";",B1)</code> to the last column of your document.
                            </p>
                            <p>The result should be like this<br /><img src="sheet.png" alt="sheet" width="449" height="119" /></p>
                            <p>
                                Then simply copy and paste the data from the new column into the textarea.
                            </p>
                        </div>
                    </div>
                    <div className="word-main">
                        {sumbitWordForm}
                    </div>
                </div>
            </>
        );
    }
}
export default App;
