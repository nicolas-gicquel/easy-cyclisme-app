export default function Footer() {
    return (
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

        <div class="text-center p-4 w-full" >
            © 2021 Copyright: <span>Nicolas  Gicquel</span> - <a class="text-white" href="/mentions-legales">Mentions Légales</a> - <a class="text-white" href="/politique-de-confidentialite">Politiques de confidentialité</a>
        </div>
    </footer>
    )
}


