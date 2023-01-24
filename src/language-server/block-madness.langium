grammar BlockMadness

import './common';
import './block-madness-A';
import './block-madness-B';
import './block-madness-C';

entry Model:
    (persons+=Person | greetings+=Greeting | goodbye+=Goodbye)*; 