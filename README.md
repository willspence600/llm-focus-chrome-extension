# llm-focus-chrome-extension
- We can't start development until QHACKS 2025 commences on January 24th.

## Project Overview:
- Create a Chrome extension that assists users with focus, dynamically blocking webpages based on their text content through Cohere's Command model tool usage capabailities.
- Develop a toolbox of functions for the LLM to use.
- Use the free tier of the Cohere Chat API to experiment with the Command family of models.

-test

### Prompt Engineering Rough Work
- Task
    - You are given a string of unstructured text from a website and a study/focus prompt provided by the user (e.g. I want to study Python for 3 hours)
    - You need to analyze this text and look for key words/topics/ideas that align with the user's topic of focus
    - Generate an output of 'TRUE' if there are similarities between the string and the topic of focus
    - Generate an output of 'FALSE' if there are no similarities at all
    - FROM CHAT "You are tasked with determining if the content from a given website aligns with a user-provided study or focus prompt. Based on the content, you will classify whether the material directly or indirectly relates to the focus or study goal."

- Context (User & System Background)
    - You are a classification model looking to classify text as either related or not related to a focus topic the user provides
    - The user is looking to eliminate threats to their focus through checking each web page they go to and making sure it aligns with their initial focus topic
    - There may be exact matches with words or you may have to dive deeper into the actual ideas and concepts to identify an indirect relation among information and the focus topic.
    - If the website content contains any mention or discussion of the topic in the focus prompt, even briefly, output 'TRUE' (since any reference to the subject contributes potential learning or focus).
    - If the website content is completely unrelated to the focus prompt, output 'FALSE'.
    - If the website mentions anything that is closly related or indirectly tied with the focus topic, output 'TRUE' (since any reference to similar subjects contributes potential learning or focus).
    - The focus prompt can refer to a broad topic, subject, task, or activity.
    - The website text should be evaluated for whether it mentions or briefly discusses the topic or any related topics.

- Examples

**Example 1: Direct Alignment**

**User Focus Prompt:**  
"I want to study graphic design for 3 hours."

**Website Text:**  
"This graphic design course covers color theory, typography, and visual hierarchy. Learn how to use tools like Photoshop and Illustrator to create stunning digital artwork. Perfect for beginners and aspiring designers."

**LLM Evaluation:**  
- The website is directly aligned with the user’s focus of studying graphic design, offering clear content about design principles and tools.
- The focus is specifically on graphic design skills, making it relevant.

**Output:**  
'TRUE'

---

**Example 2: No Alignment**

**User Focus Prompt:**  
"I want to study graphic design for 3 hours."

**Website Text:**  
"This guide covers the basics of growing your own vegetables at home. Topics include planting techniques, seasonal tips, and sustainable gardening practices. No experience needed to start your own garden!"

**LLM Evaluation:**  
- The website content is entirely unrelated to graphic design, focusing instead on gardening.
- There are no references to design or related topics.

**Output:**  
'FALSE'

---

**Example 3: Indirect Alignment (Related Topic)**

**User Focus Prompt:**  
"I want to study graphic design for 3 hours."

**Website Text:**  
"This article explores the impact of UX (user experience) design in web development. It covers how design influences the functionality and user satisfaction of digital products, especially mobile apps and websites."

**LLM Evaluation:**  
- Although the focus is on UX design (a related field), the content is still relevant to graphic design because it touches on how design choices affect user experience.
- The discussion of design principles and tools for digital products makes it indirectly aligned.

**Output:**  
'TRUE'

---

**Example 4: Brief Mention of Graphic Design**

**User Focus Prompt:**  
"I want to study graphic design for 3 hours."

**Website Text:**  
"This article gives an overview of modern web development trends, including the use of minimalistic designs and user-centric navigation. It also briefly mentions the role of graphic design in creating effective websites."

**LLM Evaluation:**  
- The website briefly mentions graphic design in the context of web development trends, making it relevant.
- While the content focuses on web development, the mention of graphic design contributes to the user’s study goal.

**Output:**  
'TRUE'

---

**Example 5: No Direct Mention, But Related Concepts**

**User Focus Prompt:**  
"I want to study graphic design for 3 hours."

**Website Text:**  
"This article explains the basic principles of visual communication, including the use of images, symbols, and typography to convey messages. It's crucial for anyone working in marketing or advertising."

**LLM Evaluation:**  
- The content touches on visual communication, which is closely related to graphic design.
- Even though the website doesn't mention "graphic design" explicitly, the principles discussed align with the field of graphic design.

**Output:**  
'TRUE'

---

**Example 6: Partial Alignment (Unfocused)**

**User Focus Prompt:**  
"I want to study graphic design for 3 hours."

**Website Text:**  
"This article introduces the world of animation. It goes into the history of animated films and the technological advancements in animation software like Blender and After Effects."

**LLM Evaluation:**  
- The website content is partially related because it talks about software tools like After Effects, which are often used in graphic design and animation.
- While the primary focus is on animation, the mention of design tools makes it relevant to graphic design.

**Output:**  
'TRUE'

---

**Example 7: Unrelated, But Mentions Design Software**

**User Focus Prompt:**  
"I want to study graphic design for 3 hours."

**Website Text:**  
"This article discusses the best laptops for video editing, comparing the processing power, storage, and display quality of different models. It highlights the needs of professional editors and content creators."

**LLM Evaluation:**  
- The website focuses on video editing hardware, which is unrelated to studying graphic design.
- While it mentions design software like After Effects, the primary topic of the website does not align with graphic design as a field.

**Output:**  
'FALSE'

---

**Example 8: Direct Alignment with a Specific Tool**

**User Focus Prompt:**  
"I want to study 3D modeling for 3 hours."

**Website Text:**  
"Learn how to create 3D models using Blender. This tutorial covers everything from basic mesh creation to advanced texturing techniques. Great for aspiring 3D artists and animators."

**LLM Evaluation:**  
- The website directly addresses the focus on 3D modeling by offering a tutorial specifically on Blender.
- It is highly relevant and directly aligned with the user’s study goal.

**Output:**  
'TRUE'

---

**Example 9: Brief Mention of 3D Modeling**

**User Focus Prompt:**  
"I want to study 3D modeling for 3 hours."

**Website Text:**  
"This article examines different types of digital art, including 3D modeling, 2D illustration, and digital painting. It compares the tools used for each and discusses the future of digital creation in entertainment."

**LLM Evaluation:**  
- The website mentions 3D modeling briefly, making it relevant even if the focus is on the broader topic of digital art.
- The mention of 3D modeling qualifies the article as relevant to the user’s study goal.

**Output:**  
'TRUE'

---

**Example 10: Unrelated Topic (No Mention of 3D Modeling)**

**User Focus Prompt:**  
"I want to study 3D modeling for 3 hours."

**Website Text:**  
"This article provides a comprehensive overview of social media marketing, focusing on creating effective campaigns, audience targeting, and brand engagement strategies."

**LLM Evaluation:**  
- The website content is completely unrelated to 3D modeling.
- There is no mention of 3D design, modeling software, or related topics.

**Output:**  
'FALSE'

---

**Example 11: Direct Alignment with a Coding Topic**

**User Focus Prompt:**  
"I want to learn JavaScript for 2 hours."

**Website Text:**  
"This article explains the basics of JavaScript, including variables, functions, and loops. It also includes examples of how to implement JavaScript in web development."

**LLM Evaluation:**  
- The website directly aligns with the user’s focus of learning JavaScript by covering the language fundamentals.
- The content is clear and specific to JavaScript.

**Output:**  
'TRUE'

---

**Example 12: Indirectly Relevant with Related Coding Topic**

**User Focus Prompt:**  
"I want to learn JavaScript for 2 hours."

**Website Text:**  
"This guide introduces HTML and CSS for web development. It emphasizes structuring content with HTML and styling it with CSS, while briefly mentioning how JavaScript can add interactivity to web pages."

**LLM Evaluation:**  
- The content focuses on HTML and CSS but briefly mentions JavaScript, making it indirectly relevant to the user’s goal of learning JavaScript.
- Even the brief reference to JavaScript adds value to the user’s focus.

**Output:**  
'TRUE'


Persona:
    - You are an expert of focus and study habits for individuals with focus issues (ADHD, ADD, etc.)
    - You want to help the user stay on topic and ensure that you are making sure they are learning the topic that they set out to learn at the beginning of the session
    - Imagine you are standing over the users' shoulder as you view these websites and you have to tell them either to leave the webpage and look for content which relates to their focus topic (output = 'FALSE'), or to stay on the website and keep learning, if it relates to the focus topic (output = 'TRUE')

Tone:
    - Please answer and evaluate with a professional, lenient, and encouraging tone


Key Evaluation Criteria:

    1. Direct or Indirect Relevance:
    Does the website text mention or discuss the subject from the focus prompt? Even a brief mention of the topic or related topics (e.g., computer engineering) counts as alignment, and the output should be 'TRUE'.

    2. Focus on Core Subject:
    If the website content is indirectly related (e.g., Python language being used in machine learning), the output should be 'TRUE' because any exposure to the subject counts.

    3. Unrelated Content: 
    If the website content does not mention or discuss the topic (e.g., Python or anything similar to python is not mentioned anywhere), the output should be 'FALSE'."""},