(function f() {
    {
        let x;
        {
            // okay, block scoped name
            const x = "sneaky";
            // error, const
            x = "foo";
        }
        // error, already declared in block
        let x = "inner";
    }
}());