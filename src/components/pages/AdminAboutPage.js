import {
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import AboutSection from '../sections/AboutSection';
import PocketBase from 'pocketbase';
import { GLOBALIP } from '../globalVars';
import AuthContext from '../storage/auth-context';

const client = new PocketBase(`${GLOBALIP}`);
let aboutData = [];

const AdminAboutPage = (props) => {
	const [isLoaded, setLoaded] = useState(false);
	const [isAboutData, setAboutData] = useState(aboutData);
	const authCtx = useContext(AuthContext);
	const inputRef = useRef();

	//{
	//   "paragraphs": [
	//     "What’s in a name?",
	//     "Willow Run ~ A Creative Farm School",
	//     "Byron grew up on a dairy farm; Willow Run Farms to be exact.  The farm was started by his grandfather, P. Lynch Whatley, and carried on by his father and uncle for many years.  In 1991 his family sold the cows, but farming is still in Byron’s blood.  We chose to pick up the unused family farm name, because to us it represents our heritage.  An agricultural heritage of hard work, innovation, creativity, and an educational atmosphere like no other. So, that explains Willow Run, but what is a Creative Farm School?  We’re glad you asked.  Each word is packed with meaning and represents our family’s vision for Willow Run.  So, let’s take a closer look.",
	//     "~Creative~",
	//     "Whatleys are known for thinking outside the box, and Byron learned from the best of them.  His father, Ernest, was known to be innovative and highly creative when it came to farming, and he did it well.  Once one of the top producing dairy farmers in Alabama, he taught Byron that thinking outside the box is a key to success.  He began grazing cows on alfalfa in the days when other folks thought that grazing on alfalfa was bad for dairy cows (now a recommended practice by Auburn University, by the way).  He once bought a ton (literally!) of peppermint candy to supply the needed sugar in his cows’ diet (definitely a favorite idea of his children’s).  He definitely had a new way to approach an age-old job – feeding his neighbors.  So, while our challenges and our solutions will be different than his, we want to look for new ways to approach each.  We want to see each need for change in our lives as an opportunity and search for a creative solution.",
	//     "'Creative' has another meaning to us, as well.  We want to always be on the look-out for the beautiful side of everyday life, and always be asking what makes the “everyday” special?  Where does the beauty lie?  Sometimes you have to be creative to find it.",
	//     "~Farm~",
	//     "We all know what a farm is, but we had a specific mission in mind when we decided to go from a backyard garden and a few chickens, to a larger agricultural endeavor.  This is where Susan Liana comes in.  Due to health challenges in the past, and a long history of problems with conventionally grown foods, she needed to make the swap to a chemical free lifestyle, and an all-natural diet.  Our mission is to raise all-natural food for our own family’s needs.  As our cup overflows, our dream is to be able to share our bounty with those around us.",
	//     "~School~",
	//     "We believe that the atmosphere of our environment plays a huge role in education.  Learning opportunities abound among farm and nature to develop one’s character and intellect.  With those things in mind, we have intentionally chosen a farming lifestyle for our family as a way to create a rich environment to raise our children in. We also desire to be a place where others can come and learn about agriculture and nature.  And what could be more important to learn about?  Because as we study creation, we study the fingerprints of our Creator."
	//   ]
	// }

	// let newData = [
	// 	{
	// 		title: 'What’s in a name?',
	// 		paragraph:
	// 			'Byron grew up on a dairy farm; Willow Run Farms to be exact.  The farm was started by his grandfather, P. Lynch Whatley, and carried on by his father and uncle for many years.  In 1991 his family sold the cows, but farming is still in Byron’s blood.  We chose to pick up the unused family farm name, because to us it represents our heritage.  An agricultural heritage of hard work, innovation, creativity, and an educational atmosphere like no other. So, that explains Willow Run, but what is a Creative Farm School?  We’re glad you asked.  Each word is packed with meaning and represents our family’s vision for Willow Run.  So, let’s take a closer look.',
	// 	},
	// 	{
	// 		title: '~Creative~',
	// 		paragraph:
	// 			'Whatleys are known for thinking outside the box, and Byron learned from the best of them.  His father, Ernest, was known to be innovative and highly creative when it came to farming, and he did it well.  Once one of the top producing dairy farmers in Alabama, he taught Byron that thinking outside the box is a key to success.  He began grazing cows on alfalfa in the days when other folks thought that grazing on alfalfa was bad for dairy cows (now a recommended practice by Auburn University, by the way).  He once bought a ton (literally!) of peppermint candy to supply the needed sugar in his cows’ diet (definitely a favorite idea of his children’s).  He definitely had a new way to approach an age-old job – feeding his neighbors.  So, while our challenges and our solutions will be different than his, we want to look for new ways to approach each.  We want to see each need for change in our lives as an opportunity and search for a creative solution.',
	// 	},
	// 	{
	// 		title: '3rd One',
	// 		paragraph:
	// 			'Here is my paragraph body long text here lorum ipsum',
	// 	},
	// ];

	// const deleteFunc = async (index) => {
	// 	console.log('deleting', index);
	// 	aboutData.splice(index, 1, )
	// }

	const saveFunc = async (index, title, paragraph) => {
		if (title != 'deleteThis') {
			const newData = {
				title: title,
				paragraph: paragraph,
			};

			//Add in the changed paragraph
			aboutData.splice(index, 1, newData);
		}

		if (title === 'deleteThis') {
			console.log('before Splice', aboutData);
			aboutData.splice(index, 1);
		}

		//Stringify the Array
		// aboutData = [
		// 	{
		// 		title: 'What’s in a name?',
		// 		paragraph:
		// 			'Byron grew up on a dairy farm; Willow Run Farms to be exact.  The farm was started by his grandfather, P. Lynch Whatley, and carried on by his father and uncle for many years.  In 1991 his family sold the cows, but farming is still in Byron’s blood.  We chose to pick up the unused family farm name, because to us it represents our heritage.  An agricultural heritage of hard work, innovation, creativity, and an educational atmosphere like no other. So, that explains Willow Run, but what is a Creative Farm School?  We’re glad you asked.  Each word is packed with meaning and represents our family’s vision for Willow Run.  So, let’s take a closer look.',
		// 	},
		// 	{
		// 		title: '~Creative~',
		// 		paragraph:
		// 			'Whatleys are known for thinking outside the box, and Byron learned from the best of them.  His father, Ernest, was known to be innovative and highly creative when it came to farming, and he did it well.  Once one of the top producing dairy farmers in Alabama, he taught Byron that thinking outside the box is a key to success.  He began grazing cows on alfalfa in the days when other folks thought that grazing on alfalfa was bad for dairy cows (now a recommended practice by Auburn University, by the way).  He once bought a ton (literally!) of peppermint candy to supply the needed sugar in his cows’ diet (definitely a favorite idea of his children’s).  He definitely had a new way to approach an age-old job – feeding his neighbors.  So, while our challenges and our solutions will be different than his, we want to look for new ways to approach each.  We want to see each need for change in our lives as an opportunity and search for a creative solution.',
		// 	},
		// 	{
		// 		title: '3rd One',
		// 		paragraph:
		// 			'Here is my paragraph body long text here lorum ipsum',
		// 	},
		// ];

		const stringy = JSON.stringify(aboutData);
		console.log('Stringed to JSON', stringy);

		//send to the client

		const data = {
			about_description: stringy,
		};
		//This is a comment to test git

		await client
			.collection('producers')
			.update(`${authCtx.sellerPageId}`, data);

		setLoaded(false);

		console.log('text', data);
	};

	const cancelFunc = () => {
		console.log('canceling');
		console.log('aboutData', aboutData);
	};
	const newSection = () => {
		console.log(aboutData);
		const data = {
			title: 'Enter your title',
			paragraph:
				'Tell everyone about what you do and why you do it.  Let them feel connected and help them understand how you grow and raise your food.',
			isEditing: true,
		};
		aboutData.push(data);
		console.log(aboutData);
		setAboutData(aboutData);
	};

	useEffect(() => {
		const loadAbout = async function () {
			const responseAbout = await client
				.collection('producers')
				.getList(1, 50, {
					filter: `id = "${authCtx.sellerPageId}"`,
				});

			if (responseAbout.items[0].about_description) {
				aboutData =
					responseAbout.items[0].about_description;
				console.log('returned', aboutData);
			} else {
				console.log('about data', aboutData);
			}

			setLoaded(true);
		};
		if (isLoaded) return;
		if (!isLoaded) loadAbout();
	});

	if (!isLoaded) {
		return <h1>loading...</h1>;
	}
	if (isLoaded) {
		return (
			<main className="container">
				<ul>
					<li ref={inputRef}>
						<AboutSection
							aboutText={isAboutData}
							edit={true}
							saveFunc={saveFunc}
							cancelFunc={cancelFunc}
						/>
					</li>

					<li>
						<button onClick={newSection}>
							{' '}
							+ add a section
						</button>
					</li>
				</ul>
			</main>
		);
	}
};

export default AdminAboutPage;
