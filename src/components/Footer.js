const Footer = props => (
    <footer class="text-center text-white bg-neutral-900" >
        <div class=" p-6 w-full">
            {/* <div class=""> */}
                <p class="flex justify-center items-center">
                    <span class="mr-4">Inscrivez-vous pour participer au projet</span>
                    <button type="button" class="inline-block px-6 py-2 border-2 border-white text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                        Inscription
                    </button>
                </p>
            {/* </div> */}
        </div>

        <div class="text-center p-4" >
            © 2021 Copyright:
            <a class="text-white" href="https://tailwind-elements.com/">Tailwind Elements</a>
        </div>
    </footer>
)

export default Footer

