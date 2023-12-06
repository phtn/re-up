const Success = () => (
	<div
		className={`group h-screen w-screen flex items-center justify-center bg-[url('/svg/scribble.svg')] bg-cover hover:bg-center hover:rotate-180 hover:scale-[200%] transition-all duration-1000`}>
		<div className='h-96 w-96 rounded-full group-hover:bg-slate-800 bg-green-300 flex items-center justify-center shadow-2xl shadow-violet-300 group-hover:scale-[25%] group-hover:rotate-[-90deg] transition-all duration-1000'>
			<h1 className='text-transparent bg-clip-text bg-gradient-to-tr from-violet-700 group-hover:from-pink-300 to-yellow-300 group-hover:to-sky-100 font-thin font-mono text-[3.5rem] tracking-widest group-hover:rotate-[-90deg] transition-all transform-gpu duration-1000'>
				Successful
			</h1>
		</div>
	</div>
)

export default Success
