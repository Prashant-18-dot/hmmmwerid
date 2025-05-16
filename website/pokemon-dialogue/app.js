class PokemonDialogue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            currentMessageIndex: 0,
            isTyping: false,
            isComplete: false
        };
        
        // Predefined messages
        this.messages = [
            "Hello mam",
            "The Divine Trials await you",
            "Prepare yourself for the journey ahead",
            "You will face challenges that test your wisdom and courage",
            "When you are ready, choose your path"
        ];
    }

    componentDidMount() {
        this.showNextMessage();
        // Preload sound
        this.sound = new Audio('pop.mp3');
        this.sound.load();
    }

    showNextMessage = () => {
        if (this.state.currentMessageIndex < this.messages.length) {
            this.setState({ isTyping: true });
            
            // Show typing indicator
            setTimeout(() => {
                this.setState({ 
                    messages: [...this.state.messages, this.messages[this.state.currentMessageIndex]],
                    currentMessageIndex: this.state.currentMessageIndex + 1,
                    isTyping: false
                });
                
                // Play sound
                this.sound.play();
                
                // Show next message after delay
                setTimeout(this.showNextMessage, 2000);
            }, 1000);
        } else {
            this.setState({ isComplete: true });
            // Redirect to why/how page after all messages
            setTimeout(() => {
                window.location.href = '../w3.html';
            }, 1000);
        }
    }

    render() {
        return (
            <div className="min-h-screen bg-gray-900 p-4">
                <div className="max-w-2xl mx-auto">
                    <div className="flex flex-col space-y-4">
                        {this.state.messages.map((message, index) => (
                            <div key={index} className="flex flex-col">
                                <div className="bg-blue-600 rounded-lg p-4 max-w-md">
                                    <p className="text-white text-lg">{message}</p>
                                </div>
                            </div>
                        ))}
                        {this.state.isTyping && (
                            <div className="flex flex-col">
                                <div className="bg-blue-600 rounded-lg p-4 max-w-md">
                                    <div className="typing-indicator">
                                        <span className="typing-dots">...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <React.StrictMode>
        <PokemonDialogue />
    </React.StrictMode>,
    document.getElementById('app')
);
