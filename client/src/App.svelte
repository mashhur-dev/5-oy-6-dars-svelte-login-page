<script lang="ts">
    import { each } from "svelte/internal";


    
    type User = {
        id: number,
        email: string,
        password: string,
        name: string,
        surname: string
    }

    let users: User[] = []

    async function getUsers() {
       const response = await fetch('http://localhost:7070/users')
       const body = await response.json()
       users = body.users
    }

    getUsers()

    let email: HTMLInputElement
    let password: HTMLInputElement
    let name: HTMLInputElement
    let surname: HTMLInputElement

    async function register() {
        let body = {
            email: email.value,
            password: password.value,
            name: name.value,
            surname: surname.value,

        }
        const response = await fetch('http://localhost:7070/register', {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        const data = await response.json()
        if(response.status == 400){
            alert(data.message)
        }
        else{
            getUsers()
        }
    }

    async function deleteUser(id: number){
    const response = await fetch(`http://localhost:7070/users/` + id, {
      method: 'DELETE',
    })

    const data = await response.json()
    alert(data.message)
    getUsers()
  }

</script>


<div class="container p-3 mb-2 bg-secondary text-white">
    <div class="form">
        <h3 class="text-light"> Register </h3>
        
        <input bind:this={email} placeholder="Email kiriting:" type="email" id="email" name="email">
        <input bind:this={password} placeholder="Parol kiriting:" type ="password" id="password" name ="name_of_password_box">  
        <input bind:this={name} placeholder="Ism kiriting: " id="name" type="text">
        <input bind:this={surname} placeholder="Familya kiriting: " id="surname" type="text">
        <button on:click={register} id="download"> Download </button>
    </div>

    <div class="content">
        <h3 class="text-light bg-dark"> Users table </h3>
        {#if users.length == 0}
            (No data)
        {:else}
        <table class="table table-dark table-striped">
            
            <thead>

                <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Delete</th>
                </tr>

            </thead>
            
            <tbody>
                {#each users as user}
                <tr>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.name}</td>
                    <td>{user.surname}</td>
                    <td class="delete"><button type="button" class="btn-close bg-white" aria-label="Close" on:click={() => {deleteUser(user.id)}}></button></td>
                </tr>
                {/each}
            </tbody>

        </table>
        {/if}
    </div>
</div>

<style>
    .container{
        display: flex;
        gap: 50px;
    }

    .form{
        width: 300px;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .content{
        widows: 100%;
    }

    th, td {
        border: 1px solid #1d1d1d;
        padding: 5px 10px;
    }

    #email{
        border-radius: 6px;
    }

    #password{
        border-radius: 6px;
    }

    #name{
        border-radius: 6px;
    }

    #surname{
        border-radius: 6px;
    }

    #download{
        border-radius: 6px;
    }

    .delete{
        display: flex;
        align-items: center;
        margin-left: auto;
        margin-right: auto;
    }

</style>