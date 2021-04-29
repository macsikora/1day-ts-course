// Where to start to make types
// what is the source of truth in the FE project?






















// server is the source of truth!
// start type end points
import fetch from 'node-fetch';
type Comment = {
    id: string,
    content: string
}
const fetchComments = async (id: User['id']): Promise<Comment[]> => {
    const result = await fetch(`https://run.mocky.io/v3/dd869c50-649e-4955-a0e5-8f6f8db68610`)
    return await result.json(); //?
}

fetchComments(12);



// try to handle errors early - catch and validate the data



// don't force separation between types and values



// share types only when you see the repetition never in advance




// VUE
class Vue {
    static extend(x: any) {

    }
}
type PropType<T> = any;

interface ComplexMessage {
    title: string,
    okMessage: string,
    cancelMessage: string
  }
  const Component = Vue.extend({
    props: {
      name: String,
      success: { type: String },
      callback: {
        type: Function as PropType<() => void>
      },
      message: {
        type: Object as PropType<ComplexMessage>,
        required: true,
        validator (message: ComplexMessage) {
          return !!message.title;
        }
      }
    }
  })





export {}